{
  inputs = {
    fenix = {
      url = "github:nix-community/fenix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "nixpkgs/nixos-24.11";
  };

  outputs = { self, fenix, flake-utils, nixpkgs }:
    flake-utils.lib.eachDefaultSystem (system:
    let

      rust-toolchain = with fenix.packages.${system}; fromToolchainFile {
        file = ./rust-toolchain.toml;
        sha256 = "sha256-yMuSb5eQPO/bHv+Bcf/US8LVMbf/G/0MSfiPwBhiPpk=";
      };

      pkgs = import nixpkgs {
        inherit system;
      };

      wasm-bindgen-cli = pkgs.callPackage "${nixpkgs}/pkgs/by-name/wa/wasm-bindgen-cli/package.nix" {
        version = "0.2.100";
        hash = "sha256-3RJzK7mkYFrs7C/WkhW9Rr4LdP5ofb2FdYGz1P7Uxog=";
        cargoHash = "sha256-tD0OY2PounRqsRiFh8Js5nyknQ809ZcHMvCOLrvYHRE=";
      };

      buildInputs = [
        rust-toolchain
        wasm-bindgen-cli
      ];

    in {
      devShells.default = pkgs.mkShell {
        name = "bevy-wasm-development";

        RUST_BACKTRACE = "1";

        packages = with pkgs; [
          simple-http-server
        ] ++ buildInputs;
      };

      packages.build-wasm = pkgs.stdenv.mkDerivation rec {
        name = "build-wasm";
        nativeBuildInputs = with pkgs; [
          pkg-config
          rustPlatform.cargoSetupHook
          rustPlatform.bindgenHook
          rust-toolchain
        ];

        inherit buildInputs;
        src = ./.;
        cargoDeps = pkgs.rustPlatform.fetchCargoVendor {
          inherit src;
          name = "build-wasm-cargo";
          hash = "sha256-8CR7mT54aHL8sUUSSPTPDAUpSNxW8Ilom3VDexWCGSI=";
        };

        postUnpack = ''
          export CARGO_HOME=$PWD/.cargo
        '';
        buildPhase = ''
          ./build-wasm.sh
        '';
        installPhase = ''
          mkdir -p $out
          cp -a ./web $out
        '';
      };
    });
}
