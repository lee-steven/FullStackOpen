const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    for(let i = 0; i < blogs.length; i++){
        total = total + blogs[i].likes
    }
    return total
}

const favoriteBlog = (blogs) => {
    let mostFavBlog = {}
    let numLikes = 0
    for(let i = 0; i < blogs.length; i++){
        if(blogs[i].likes > numLikes) {
            numLikes = blogs[i].likes
            mostFavBlog = blogs[i]
        }
    }
    return mostFavBlog
}

const mostBlogs = (blogs) => {
    let authorMap = new Map()

    blogs.forEach(blog => {
        if(authorMap.has(blog.author)){
            authorMap.set(blog.author, authorMap.get(blog.author) + 1)
        } else {
            authorMap.set(blog.author, 1)
        }
    })

    let mostBlogsAuthor = ""
    let mostBlogsValue = 0
    for(let [key, value] of authorMap) {
        if(value > mostBlogsValue) {
            mostBlogsAuthor = key
            mostBlogsValue = value
        }
    }

    const mostBlogs = {
        author: mostBlogsAuthor,
        blogs: mostBlogsValue
    }

    return mostBlogs
}


const mostLikes = (blogs) => {
    let authorMap = new Map()

    blogs.forEach(blog => {
        if(authorMap.has(blog.author)){
            const prevLikes = authorMap.get(blog.author)
            authorMap.set(blog.author, prevLikes + blog.likes)
        } else {
            authorMap.set(blog.author, blog.likes)
        }
    })

    let mostLikesAuthor = ""
    let mostLikesValue = 0
    for(let [key, value] of authorMap) {
        if(value > mostLikesValue) {
            mostLikesAuthor = key
            mostLikesValue = value
        }
    }

    const mostLikes = {
        author: mostLikesAuthor,
        likes: mostLikesValue
    }

    return mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}