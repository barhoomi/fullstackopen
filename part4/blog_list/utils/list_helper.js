const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    const sortedBlogs = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
    //console.log("sorted blogs: ",sortedBlogs)
    return blogs.length == 0 ? 0 : sortedBlogs[0]
}

const mostBlogs = (blogs) => {
    if(blogs.length == 0) return {}
    var authors = blogs.reduce((sum, blog) => {
        //console.log("author: ", blog.author, " sum: ", sum)
        if (blog.author in sum) {
            sum[blog.author] += 1
        }
        else {
            sum[blog.author] = 1
        }
        return sum
    }, {})
    var authors = Object.keys(authors).map((key) => [key, authors[key]])

    const sortedAuthors = authors.sort((authorA, authorB) => authorB[1] - authorA[1])
    //console.log("sorted authors: ",sortedAuthors)
    return { "author":sortedAuthors[0][0], "blogs":sortedAuthors[0][1] }
}

const mostLikes = (blogs) => {
    if(blogs.length == 0) return {}

    var authors = blogs.reduce((sum, blog) => {
        //console.log("author: ", blog.author, " sum: ", sum)
        if (blog.author in sum) {
            sum[blog.author] += blog.likes
        }
        else {
            sum[blog.author] = blog.likes
        }
        return sum
    }, {})
    var authors = Object.keys(authors).map((key) => [key, authors[key]])

    const sortedAuthors = authors.sort((authorA, authorB) => authorB[1] - authorA[1])
    //console.log("sorted authors: ",sortedAuthors)

    return { "author":sortedAuthors[0][0], "likes":sortedAuthors[0][1] }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}
