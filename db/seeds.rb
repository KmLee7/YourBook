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
      last_name: 'One', 
      email: 'demo@demo.io', 
      password: 'password',
      birthday: '10/21/2022',
      gender: 'Male',
      bio: '',
      work: '',
      highschool: '',
      college: '',
      city: '',
      hometown: '',
      relationship: '',
      hobbies: '',
    )
    User.create!(
      first_name: 'Jacob',
      last_name: 'Smith', 
      email: 'jacob@demo.io', 
      password: 'password',
      birthday: '01/02/2000',
      gender: 'Male',
      bio: '',
      work: '',
      highschool: '',
      college: '',
      city: '',
      hometown: '',
      relationship: '',
      hobbies: '',
    )
    User.create!(
      first_name: 'Jennifer',
      last_name: 'Johnson', 
      email: 'jennifer@demo.io', 
      password: 'password',
      birthday: '01/02/2001',
      gender: 'Female',
      bio: '',
      work: '',
      highschool: '',
      college: '',
      city: '',
      hometown: '',
      relationship: '',
      hobbies: '',
    )
    User.create!(
      first_name: 'Kevin',
      last_name: 'Brown', 
      email: 'kevin@demo.io', 
      password: 'password',
      birthday: '01/02/1999',
      gender: 'Male',
      bio: '',
      work: '',
      highschool: '',
      college: '',
      city: '',
      hometown: '',
      relationship: '',
      hobbies: '',
    )
    User.create!(
      first_name: 'James',
      last_name: 'Jones', 
      email: 'james@demo.io', 
      password: 'password',
      birthday: '01/02/1997',
      gender: 'Male',
      bio: '',
      work: '',
      highschool: '',
      college: '',
      city: '',
      hometown: '',
      relationship: '',
      hobbies: '',
    )
    User.create!(
      first_name: 'Lily',
      last_name: 'Miller', 
      email: 'lily@demo.io', 
      password: 'password',
      birthday: '01/02/1993',
      gender: 'Female',
      bio: '',
      work: '',
      highschool: '',
      college: '',
      city: '',
      hometown: '',
      relationship: '',
      hobbies: '',
    )
    Post.create!(
      content: "Hey",
      user_id: 3
    )
    Post.create!(
      content: "Hello!",
      user_id: 2
    )
    Post.create!(
      content: "It's getting cold outside",
      user_id: 4
    )
    Post.create!(
      content: "How's everybody doing?",
      user_id: 5
    )
    Post.create!(
      content: "I need some coffee",
      user_id: 6
    )
    Post.create!(
      content: "Help me with this problem..",
      user_id: 2
    )
    Post.create!(
      content: "It's almost winter",
      user_id: 4
    )
    Post.create!(
      content: "Mets lost, let's go Yankees",
      user_id: 5
    )
    Post.create!(
      content: "Forgot to bring my umbrella",
      user_id: 6
    )
    Post.create!(
      content: "I really need help",
      user_id: 2
    )
  
    puts "Done!"
  end