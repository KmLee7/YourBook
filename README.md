# YourBook

[Yourbook](https://your--book.herokuapp.com/)

## Brief Overview

Yourbook is a clone of FaceBook and has the functionality for profiles, posts as of right now. In the future, Users will be able to like a post / comment
and comment(reply) on posts and search other users by usernames.

## Technologies Used

- Ruby
- Ruby on Rails
- JavaScript
- React
- Redux
- Heroku

## Libraries Used

- React-Icons for all the Icons used.

## Two features

- I can make posts and be able to grab that specific users' posts on their profile page.

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

```Js
return (
     <div className="one-post" key={post.id}>
       <div className="user-logo-name">
         <FaUserCircle size={25} className="default-profile" />
         <div className="line-break1h"></div>
         {username}
       </div>
       <div className="line-break6h"></div>
       <div>{post.content}</div>
     </div>
   );
 };

 const PostList = Object.values(posts)
   .reverse()
   .map((post) => {
     if (currentUser.id === post.user_id) {
       return <PostIndexItem key={post.id} post={post} />;
     }
   });
```

- Able to show the lastest post from users and populate the post form.

```Js
 const dispatch = useDispatch();
  const posts = useSelector((state) => state.entities.posts);
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );

  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }
  useEffect(() => {
    dispatch(postActions.fetchPosts());
  }, []);
  const PostList = Object.values(posts)
    .reverse()
    .map((post) => {
      return
```

# Challenges I faced and still facing

My code is all over the place, so to debug it takes a lot of time. If I one feature to work then the other feature would break.
When I figured that I had to clean up my code, it's already close to the due that.

# Future Implements

- Debug the User Auth.
- Keep the code Dry so that it's easier to debug.
- Implement on aws profile photos / background profile pictures.
- Be able to post / edit photos or posts.
- Have users like a post / comment (reply).
- Have comments on posts.
- Have search bar set up, so that users can search other users by searching username.
