# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      first_name: 'Demo',
      last_name: 'one', 
      email: 'demo@demo.io', 
      password: 'password',
      birthday: '01/02/2000',
      gender: 'Male',
      work: "none",
      highschool: "none",
      college: "none",
      city: "none",
      hometown: "none",
      relationship: "none"
    )
    User.create!(
      first_name: 'Demo5',
      last_name: 'five', 
      email: 'demo5@demo.io', 
      password: 'password',
      birthday: '01/02/2001',
      gender: 'Male',
      work: "none",
      highschool: "none",
      college: "none",
      city: "none",
      hometown: "none",
      relationship: "none"
    )
  
    puts "Done!"
  end