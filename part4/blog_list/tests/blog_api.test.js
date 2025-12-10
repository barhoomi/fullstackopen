const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const logger = require("../utils/logger")
const app = require("../app")
const Blog = require("../models/blog")
const helper = require("./test_helper")
const api = supertest(app)




beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }

})

// test("blogs are returned as json", async () => {
//     const blogs = await api
//         .get("/api/blogs")
//         .expect(200)
//         .expect("Content-Type", /application\/json/)
//     console.log("Blogs:??",blogs)
//     assert.strictEqual(blogs.length,helper.initialBlogs.length)
// })

test("all blogs are returned", async () => {
    const blogs = await api.get("/api/blogs")
    logger.info(blogs.body)
    assert.strictEqual(blogs.body.length, helper.initialBlogs.length)
})

test("unique identifier property of the blog posts is named id", async () => {
    const blogs = await api.get("/api/blogs")
    assert.strictEqual(blogs.body.length, blogs.body.map(blog => blog.id).length)
    assert.strictEqual(0, blogs.body.filter(blog => blog["_id"] !== undefined).length)
})

test("making an HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {

    const newPostId = "892c44bdfecbea804ddd6bea"
    const newPost = {
        title: "You make your perfect world",
        author: "Derek Sivers",
        url: "https://sive.rs/ayw8",
        likes: 4,
        _id: newPostId
    }

    await api
        .post("/api/blogs")
        .send(newPost)
        .expect(201)
        .expect("Content-Type", /application\/json/)


    const blogs = await api.get("/api/blogs")
    const newBlog = await api.get(`/api/blogs/${newPostId}`).expect(200)
    assert.strictEqual(blogs.body.length, helper.initialBlogs.length + 1)
    assert.notStrictEqual(newBlog, undefined)
    logger.info(blogs.body)
})

test("missing likes property defaults to 0", async () => {
    const newPostId = "892c44bdfecbea804ddd6bea"
    const newPost = {
        title: "You make your perfect world",
        author: "Derek Sivers",
        url: "https://sive.rs/ayw8",
        _id: newPostId
    }

    await api
        .post("/api/blogs")
        .send(newPost)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const newBlog = await api.get(`/api/blogs/${newPostId}`).expect(200)
    assert.strictEqual(newBlog.body.likes, 0)
})


test("missing title returns status code 400", async () => {
    const newPostId = "892c44bdfecbea804ddd6bea"
    const newPost = {
        author: "Derek Sivers",
        url: "https://sive.rs/ayw8",
        _id: newPostId,
        likes: 100
    }

    const response = await api
        .post("/api/blogs")
        .send(newPost)
        .expect(400)
        .expect("Content-Type", /application\/json/)


    assert.strictEqual(response.statusCode, 400)
})

test("missing url returns status code 400", async () => {
    const newPostId = "892c44bdfecbea804ddd6bea"
    const newPost = {
        title: "Title",
        author: "Derek Sivers",
        _id: newPostId,
        likes: 100
    }

    const response = await api
        .post("/api/blogs")
        .send(newPost)
        .expect(400)
        .expect("Content-Type", /application\/json/)


    assert.strictEqual(response.statusCode, 400)
})

test("missing url and title returns status code 400", async () => {
    const newPostId = "892c44bdfecbea804ddd6bea"
    const newPost = {
        author: "Derek Sivers",
        _id: newPostId,
        likes: 100
    }

    const response = await api
        .post("/api/blogs")
        .send(newPost)
        .expect(400)
        .expect("Content-Type", /application\/json/)


    assert.strictEqual(response.statusCode, 400)
})

test("blog post can be deleted", async () => {

    const blogsBefore = await helper.blogsInDb()
    const length1 = blogsBefore.length

    await api.delete("/api/blogs/892c44bdfecbea804ddd6bea").expect(204)

    const blogsAfter = await helper.blogsInDb()
    const length2 = blogsAfter.length

    assert.strictEqual(length2, length1 - 1)

})

test.only("blog post can be updated", async () => {
    const blogs = await helper.blogsInDb()
    const blogBefore = blogs[0]

    blogBefore.url = "https://google.com"

    const updatedBlog = await api.put(`/api/blogs/${blogBefore.id}`)
        .send(blogBefore)
        .expect(200)
        .expect("Content-Type", /application\/json/)

    assert.deepStrictEqual(updatedBlog.body,blogBefore)
})

after(async () => {
    await mongoose.connection.close()
})