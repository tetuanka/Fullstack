const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 1){
    return blogs[0].likes
  }
  if (blogs.length === 0){
    return 0
  }
  var sum = 0
  for (let i=0; i<blogs.length; i++){
    sum += blogs[i].likes
  }
  return sum
}

const mostBlogs = (blogs) => {
  const bloggers = []
  for(let i=0; i<blogs.length; i++){
    var nimi = blogs[i].author
    const duplicate = bloggers.some(blogger => blogger.author === nimi)
    if (duplicate) {
      for(let j=0; j<bloggers.length; j++){
        if(bloggers[j].author === nimi){ 
          bloggers[j].blogs += 1
        }
      }
    }
    else {
      bloggers[bloggers.length] = {
        'author': nimi,
        'blogs': 1
      }
    }
  }
  var most = bloggers[0]
  for (let i=0; i<bloggers.length; i++){
    if(bloggers[i].blogs>most.blogs){
      most = bloggers[i]
    }
  }
  return most
}

const mostLikes = (blogs) => {
  const bloggers = []
  for(let i=0; i<blogs.length; i++){
    var nimi = blogs[i].author
    var likes = blogs[i].likes
    const duplicate = bloggers.some(blogger => blogger.author === nimi)
    if (duplicate) {
      for(let j=0; j<bloggers.length; j++){
        if(bloggers[j].author === nimi){ 
          bloggers[j].likes += blogs[i].likes
        }
      }
    }
    else {
      bloggers[bloggers.length] = {
        'author': nimi,
        'likes': likes
      }
    }
  }
  var most = bloggers[0]
  for (let i=0; i<bloggers.length; i++){
    if(bloggers[i].likes>most.likes){
      most = bloggers[i]
    }
  }
  return most
}

const favoriteBlog = (blogs) => {
  var fav = 0
  for (let i=0; i<blogs.length; i++){
    if (blogs[i].likes>blogs[fav].likes){
      fav = i
    }
  }
  const returnBlog = {
    author: blogs[fav].author,
    title: blogs[fav].title,
    likes: blogs[fav].likes,
  } 
  return returnBlog

}

module.exports = {
  dummy,totalLikes, favoriteBlog, mostBlogs, mostLikes
}