const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum,blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    const sortedBlogs = blogs.sort((blogA, blogB)=> blogB.likes - blogA.likes)
    //console.log("sorted blogs: ",sortedBlogs)
    return blogs.length == 0? 0: sortedBlogs[0]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
