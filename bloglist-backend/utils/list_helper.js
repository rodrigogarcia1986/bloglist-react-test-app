const dummy = (blogs) => {
    return 1;
}

const otherForTest = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f121",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
]

const fortest = [
    {
        title: 'Qualquer coisa',
        author: 'Rodrigo Manoel',
        url: 'https://www.linkedin.com/feed/update/urn:li:activity:7073993243259998208/',
        likes: 350
    },
    {
        title: 'Mudança de carreira',
        author: 'Rodrigo Manoel',
        url: 'https://www.linkedin.com/feed/update/urn:li:activity:7073993243259998208/',
        likes: 150
    },
    {
        title: 'Eetc etc etc',
        author: 'Ninguém',
        url: 'https://www.linkedin.com/feed/update/urn:li:activity:7073993243259998208/',
        likes: 350
    },
    {
        title: 'Qualquer coisa 2',
        author: 'Rodrigo Manoel',
        url: 'https://www.linkedin.com/feed/update/urn:li:activity:7073993243259998208/',
        likes: 100
    },
    {
        title: 'Qualquer coisa3',
        author: 'Outrem',
        url: 'https://www.linkedin.com/feed/update/urn:li:activity:7073993243259998208/',
        likes: 90
    }
]

const totalLikes = (posts) => {

    const total = posts.reduce((sum, item, index) => {
        //console.log(sum, item, item.likes, index)

        sum += item.likes
        return sum;

    }, 0)

    return total;
}

const favoriteBlog = (blogs) => {

    let numLikes = 0;

    const topLiked = blogs.reduce((sum, item) => {

        if (item.likes > numLikes) {
            numLikes = item.likes
        }
        return numLikes

    }, 0)

    const favorite = blogs.find(blog => blog.likes === numLikes)

    return favorite
}

const mostBlogs = (array) => {

    const countArray = []

    let index = 0

    while (index < array.length) {

        let count = 0;

        for (let x of array) {
            //console.log("Printing one item", x)
            if (x.author === array[index].author) {
                count++
            }
        }

        const found = countArray.find(y => y.author === array[index].author)

        if (found === undefined) {
            //console.log(found)
            countArray.push({
                author: array[index].author,
                blogs: count
            })
        } else {
            const foundIndex = countArray.findIndex(blog => blog.author === array[index].author)
            //console.log("found", found, "foundindex", foundIndex, "count array found index", countArray[foundIndex])
            countArray[foundIndex].blogs = count;
        }

        //console.log(count, index)

        index++
    }

    // for (let item of countArray) {
    //     console.log(item)
    // }

    let maxCount = 0;

    for (let item of countArray) {

        if (item.blogs > maxCount) {
            maxCount = item.blogs
            //console.log(item)
        }
    }

    const answer = countArray.find(item => item.blogs === maxCount)
    console.log("answer", answer)

    return answer
}

const mostLikes = (array) => {

    const countArray = []

    let index = 0

    while (index < array.length) {

        let likesCount = 0;

        for (let x of array) {
            //console.log("Printing one item", x)
            if (x.author === array[index].author) {
                likesCount = array[index].likes
            }
        }

        const found = countArray.find(y => y.author === array[index].author)

        if (found === undefined) {
            //console.log(found)
            countArray.push({
                author: array[index].author,
                likes: likesCount
            })
        } else {
            const foundIndex = countArray.findIndex(blog => blog.author === array[index].author)
            //console.log("found", found, "foundindex", foundIndex, "count array found index", countArray[foundIndex])
            countArray[foundIndex].likes += likesCount;
        }

        //console.log(count, index)

        index++
    }

    // for (let item of countArray) {
    //     console.log(item)
    // }

    let maxCount = 0;

    for (let item of countArray) {

        if (item.likes > maxCount) {
            maxCount = item.likes
            //console.log(item)
        }
    }

    const answer = countArray.find(item => item.likes === maxCount)
    //console.log("answer", answer)

    return answer

}

//console.log(mostLikes(otherForTest))

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}