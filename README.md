# Yourbook

[Yourbook](https://your--book.herokuapp.com/login)

## Brief Overview

Yourbook is clone of Facebook and has the functionality for profiles and posts for now. In the future, users will be able to like a post and comment/ reply on the post.

## Technologies Used

- Ruby
- Ruby on Rails
- JavaScript
- React
- Redux
- Heroku

## Two Feactures are Post and Profiles

- Able to pull up all the posts that users have made

```Js
const PostIndexItem = ({ post }) => {
 const user = useSelector(({ entities: { users } }) => users[post.user_id]);
 let username;
 if (user) {
   username = user.first_name + " " + user.last_name;
 }

 return (
   <div className="one-post" key={post.id}>
     <div className="user-logo-name">
       <FaUserCircle size={25} />
       <div className="line-break1h"></div>
       {username}
     </div>
     <div className="line-break6h"></div>
     <div>{post.content}</div>
   </div>
 );
```

- Able to pull up all the posts that specific user has made in the user's profile page.

```Js
            <div className="upper">
               <FaUserCircle size={33} className="default-profile" />
               <div className="line-break1h"></div>
               <div className="post-form-button">
                 <PostFormModal />
               </div>
             </div>
             <div className="line-break4h"></div>
             <div className="border-line1h"></div>
           </div>
           <div className="line-break5h"></div>
           <div className="all-posts">
             <div>{PostList}</div>
           </div>
```

## Challenges I have faced and is facing

- Code is all of the place so it's hard to pinpoint where the bug is happening.
- When I thought I was done with one feature and work on another feature, the prev feature causes error.

## Future Implements

- Have all the bugs debugged
- Able to delete/ edit posts
- Able to like and comment on posts
- Keep the code dry.
