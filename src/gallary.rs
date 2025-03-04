use bevy::{
    input::touch::TouchPhase, prelude::*, window::{PrimaryWindow, WindowResolution}
};

use crate::log;

// Main entry point
pub fn main() {
    App::new()
        .add_plugins(
            DefaultPlugins.set(WindowPlugin {
                primary_window: Some(Window {
                    resolution: WindowResolution::new(800.0, 800.0).with_scale_factor_override(1.0),
                    title: "Bevy WASM Gallery".to_string(),
                    position: WindowPosition::Centered(MonitorSelection::Current),
                    ..default()
                }),
                ..default()
            }),
        )
        .add_systems(Startup, setup)
        .add_systems(Update, (handle_input, update_gallery_layout, update_animations))
        .run();
}

// Asset handles for our images
#[derive(Resource)]
struct GalleryImages {
    images: Vec<Handle<Image>>,
}

// Component to mark gallery images
#[derive(Component)]
struct GalleryItem {
    index: usize,
    is_expanded: bool,
    width: f32,
    height: f32,
}

// Component for the fullscreen overlay
#[derive(Component)]
struct FullscreenOverlay;

#[derive(Resource)]
struct AnimationState {
    expanding: Option<(Entity, f32)>, // Entity and animation progress (0.0 to 1.0)
    collapsing: Option<(Entity, f32)>,
    animation_speed: f32,
}

impl Default for AnimationState {
    fn default() -> Self {
        Self {
            expanding: None,
            collapsing: None,
            animation_speed: 2.9,
        }
    }
}

// Setup function to initialize our game
fn setup(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
    mut windows: Query<&mut Window, With<PrimaryWindow>>,
) {
    // Camera
    commands.spawn(Camera2dBundle::default());
    
    // Load images
    let images = vec![
        asset_server.load("muffin.png"),
        asset_server.load("cake.png"),
        asset_server.load("chips.png"),
        asset_server.load("croissant.png"),
        asset_server.load("bread.png"),
        asset_server.load("egg.png"),
    ];
    
    commands.insert_resource(GalleryImages { images: images.clone() });
    commands.insert_resource(AnimationState::default());
    
    let mut window = windows.single_mut();
    let window_width = window.resolution.width();
    let window_height = window.resolution.height();
    
    // Scale for mobile
    window.resolution.set_scale_factor_override(Some(1.0));
    
    // Calculate grid layout
    let grid_size = 3; // 3x3 grid
    let padding = 10.0;
    let item_width = (window_width / grid_size as f32) - (padding * 2.0);
    let item_height = (window_height / grid_size as f32) - (padding * 2.0);
    
    // Spawn gallery items in a grid
    for i in 0..images.len() {
        commands.spawn((
            SpriteBundle {
                texture: images[i].clone(),
                sprite: Sprite {
                    custom_size: Some(Vec2::new(item_width, item_height)),
                    ..default()
                },
                ..default()
            },
            GalleryItem {
                index: i,
                is_expanded: false,
                width: item_width,
                height: item_height,
            },
        ));
    }
    
    // Fullscreen overlay (invisible by default)
    commands.spawn((
        SpriteBundle {
            sprite: Sprite {
                color: Color::rgba(0.0, 0.0, 0.0, 0.8),
                custom_size: Some(Vec2::new(window_width, window_height)),
                ..default()
            },
            transform: Transform::from_xyz(0.0, 0.0, 10.0),
            visibility: Visibility::Hidden,
            ..default()
        },
        FullscreenOverlay,
    ));
}

// Handle user input (mouse clicks and touch)
fn handle_input(
    mut commands: Commands,
    windows: Query<&Window, With<PrimaryWindow>>,
    gallery_items: Query<(Entity, &Transform, &mut GalleryItem)>,
    mut fullscreen_overlay: Query<(Entity, &mut Visibility), With<FullscreenOverlay>>,
    gallery_images: Res<GalleryImages>,
    mouse_button_input: Res<Input<MouseButton>>,
    mut touches: EventReader<TouchInput>,
    mut animation_state: ResMut<AnimationState>,
) {
    let window = windows.single();
    let (_overlay_entity, mut overlay_visibility) = fullscreen_overlay.single_mut();
    
    // Check if any existing fullscreen image should be closed
    if (*overlay_visibility == Visibility::Visible) && 
       (mouse_button_input.just_pressed(MouseButton::Left) || touches.read().any(|touch| touch.phase == TouchPhase::Started)) {
        // Hide overlay
        *overlay_visibility = Visibility::Hidden;
        
        // Remove any expanded image
        for (entity, _, item) in gallery_items.iter() {
            if item.is_expanded {
                animation_state.collapsing = Some((entity, 0.0));
            }
        }
        return;
    }
    
    // Check if a gallery item was clicked/touched
    let mut cursor_position = None;
    
    // Handle mouse clicks
    if mouse_button_input.just_pressed(MouseButton::Left) {
        if let Some(position) = window.cursor_position() {
            cursor_position = Some(position);
        }
    }
    
    // Handle touch input
    for _touch in touches.read().filter(|touch| touch.phase == TouchPhase::Started) {
        if let Some(position) = window.cursor_position() {
            log::console(&format!("cursor_position is {position}"));
            cursor_position = Some(position);
        }
    }

    if let Some(position) = cursor_position {
        // Convert screen position to world coordinates
        let window_size = Vec2::new(window.resolution.width(), window.resolution.height());
        let world_position = Vec2::new(
            position.x - window_size.x / 2.0,
            window_size.y / 2.0 - position.y,
        );
        
        // Check if any gallery item was clicked
        for (_, transform, item) in gallery_items.iter() {
            let item_size = Vec2::new(
                (window_size.x / 2.0) - 20.0,
                (window_size.y / 2.0) - 20.0,
            );
            
            let min_x = transform.translation.x - item_size.x / 2.0;
            let max_x = transform.translation.x + item_size.x / 2.0;
            let min_y = transform.translation.y - item_size.y / 2.0;
            let max_y = transform.translation.y + item_size.y / 2.0;
            
            if world_position.x >= min_x && world_position.x <= max_x &&
               world_position.y >= min_y && world_position.y <= max_y {
                // Show fullscreen overlay
                *overlay_visibility = Visibility::Visible;
                
                // Show expanded image
                let expanded_entity = commands.spawn((
                    SpriteBundle {
                        texture: gallery_images.images[item.index].clone(),
                        sprite: Sprite {
                            custom_size: Some(Vec2::new(item.width, item.height)),
                            ..default()
                        },
                        transform: Transform::from_xyz(0.0, 0.0, 15.0),
                        ..default()
                    },
                    GalleryItem {
                        index: item.index,
                        is_expanded: true,
                        width: item.width,
                        height: item.height,
                    },
                )).id();
                animation_state.expanding = Some((expanded_entity, 0.0));
                
                break;
            }
        }
    }
}

// Update gallery layout on window resize
fn update_gallery_layout(
    windows: Query<&Window, (With<PrimaryWindow>, Changed<Window>)>,
    mut gallery_items: Query<(&mut Transform, &mut Sprite, &GalleryItem), Without<FullscreenOverlay>>,
    mut fullscreen_overlay: Query<(&mut Transform, &mut Sprite), With<FullscreenOverlay>>,
) {
    let window = match windows.get_single() {
        Ok(window) => window,
        Err(_) => return,
    };
    
    let window_width = window.resolution.width();
    let window_height = window.resolution.height();
    
    // Update fullscreen overlay size
    if let Ok((mut transform, mut sprite)) = fullscreen_overlay.get_single_mut() {
        sprite.custom_size = Some(Vec2::new(window_width, window_height));
        transform.translation.x = 0.0;
        transform.translation.y = 0.0;
    }
    
    // Calculate new grid layout
    let grid_size = 3; // 3x3 grid
    let padding = 10.0;
    let item_width = (window_width / grid_size as f32) - (padding * 2.0);
    let item_height = (window_height / grid_size as f32) - (padding * 2.0);
    
    // Update non-expanded gallery items
    for (mut transform, mut sprite, item) in gallery_items.iter_mut() {
        if !item.is_expanded {
            let row = (item.index / grid_size) as f32;
            let col = (item.index % grid_size) as f32;
            
            let x_pos = col * item_width + col * padding * 2.0 - window_width / 2.0 + item_width / 2.0 + padding;
            let y_pos = -row * item_height - row * padding * 2.0 + window_height / 2.0 - item_height / 2.0 - padding;
            
            transform.translation.x = x_pos;
            transform.translation.y = y_pos;
            sprite.custom_size = Some(Vec2::new(item_width, item_height));
        }
    }
}

// Animation system to handle expanding and collapsing animations
fn update_animations(
    mut commands: Commands,
    time: Res<Time>,
    mut animation_state: ResMut<AnimationState>,
    windows: Query<&Window, With<PrimaryWindow>>,
    mut gallery_items: Query<(&mut Transform, &mut Sprite, &GalleryItem)>,
    mut fullscreen_overlay: Query<&mut Visibility, With<FullscreenOverlay>>,
) {
    let window = windows.single();
    let window_size = Vec2::new(window.resolution.width(), window.resolution.height());
    
    // Handle expanding animation
    if let Some((entity, progress)) = animation_state.expanding {
        if let Ok((mut transform, mut sprite, _)) = gallery_items.get_mut(entity) {
            // Calculate new progress
            let new_progress = (progress + time.delta_seconds() * animation_state.animation_speed).min(1.0);
            
            // Apply easing function (cubic ease out)
            let eased_progress = 1.0 - (1.0 - new_progress).powi(3);
            
            // Interpolate size from thumbnail to fullscreen
            let start_size = sprite.custom_size.unwrap();
            let target_size = Vec2::new(window_size.x * 0.9, window_size.y * 0.9);
            let new_size = start_size.lerp(target_size, eased_progress);
            
            // Interpolate position from original to center
            let start_pos = transform.translation;
            let target_pos = Vec3::new(0.0, 0.0, 15.0);
            transform.translation = start_pos.lerp(target_pos, eased_progress);
            
            // Update sprite size
            sprite.custom_size = Some(new_size);
            
            // Update progress
            animation_state.expanding = if new_progress >= 1.0 {
                None // Animation complete
            } else {
                Some((entity, new_progress))
            };
        }
    }
    
    // Handle collapsing animation
    if let Some((entity, progress)) = animation_state.collapsing {
        if let Ok((_transform, mut sprite, _)) = gallery_items.get_mut(entity) {
            // Calculate new progress
            let new_progress = (progress + time.delta_seconds() * animation_state.animation_speed).min(1.0);
            
            // Apply easing function (cubic ease in)
            let eased_progress = new_progress.powi(3);
            
            // For collapsing, we fade out by reducing opacity
            let start_size = Vec2::new(window_size.x * 0.9, window_size.y * 0.9);
            let new_size = start_size * (1.0 - eased_progress);
            
            // Update sprite size
            sprite.custom_size = Some(new_size);
            
            // Update opacity by changing alpha
            let mut color = sprite.color;
            color.set_a(1.0 - eased_progress);
            sprite.color = color;
            
            // Update progress
            if new_progress >= 1.0 {
                // Animation complete, remove the entity
                commands.entity(entity).despawn();
                
                // Hide overlay
                if let Ok(mut visibility) = fullscreen_overlay.get_single_mut() {
                    *visibility = Visibility::Hidden;
                }
                
                animation_state.collapsing = None;
            } else {
                animation_state.collapsing = Some((entity, new_progress));
            }
        }
    }
}

