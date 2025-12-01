const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes } = require('../utils/list_helper')

describe('dummy function', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = dummy(blogs)
        assert.strictEqual(result, 1)
    })
})

describe('total likes', () => {

    test("total likes of empty list is zero", () => {
        const blogs = []

        const result = totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test("total likes when list has only one blog equals the likes of that", () => {
        const blogs = [
            {
                _id: "5a422aa71b54a676234d17f8",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.ucl.ac.uk/teaching/academic/academic-skills/academic-writing/academic-writing-structure",
                likes: 5
            }
        ]

        const result = totalLikes(blogs)
        assert.strictEqual(result, 5)
    })
    test("total likes of a bigger list is calculated right", () => {
        const blogs = [
            {
                _id: "5a422a851b54a676234d17f7",
                title: "React patterns",
                author: "Michael Chan",
                url: "https://reactpatterns.com/",
                likes: 7
            },
            {
                _id: "5a422b3c1b54a676234d17f9",
                title: "Go To Statement Considered Harmful",
                author: "Edsger W. Dijkstra",
                url: "http://www.ucl.ac.uk/teaching/academic/academic-skills/academic-writing/academic-writing-structure",
                likes: 5
            }
        ]

        const result = totalLikes(blogs)
        assert.strictEqual(result, 12)
    })
})
