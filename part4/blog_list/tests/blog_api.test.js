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

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

// test("blogs are returned as json", async () => {
//     const blogs = await api
//         .get("/api/blogs")
//         .expect(200)
//         .expect("Content-Type", /application\/json/)
//     console.log("Blogs:??",blogs)
//     assert.strictEqual(blogs.length,helper.initialBlogs.length)
// })

test.only("all blogs are returned", async () => {
    const blogs = await api.get("/api/blogs")
    logger.info(blogs.body)
    assert.strictEqual(blogs.body.length, helper.initialBlogs.length)
})

test.only("unique identifier property of the blog posts is named id", async () => {
    const blogs = await api.get("/api/blogs")
    assert.strictEqual(blogs.body.length, blogs.body.map(blog => blog.id).length)
    assert.strictEqual(0, blogs.body.filter(blog => blog["_id"]!==undefined).length)
})

after(async () => {
    await mongoose.connection.close()
})