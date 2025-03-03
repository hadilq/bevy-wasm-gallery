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

      packages.build-wasm = pkgs.stdenv.mkDerivation {
        name = "build-wasm";
        inherit buildInputs;
        src = ./.;
        postUnpack = ''
          export CARGO_HOME=$PWD/.cargo
        '';
        buildPhase = ''
          runHook preBuild
          ./build-wasm.sh
          runHook postBuild
        '';
        installPhase = ''
          mkdir -p $out/bin
          cp -a ./web $out
        '';
        outputHashAlgo = "sha256";
        outputHashMode = "recursive";
        outputHash = "sha256-B0PBBwzsm8WJ9XYSs6koW69NluGrzAsxycf6k/bDAOA=";
      };
    });
}
