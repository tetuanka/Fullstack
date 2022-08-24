const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const helper = require("./test_helper");

const initialBlogs = [
  {
    id: 1,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: 1,
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("the first blog is about React patterns", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].title).toBe("React patterns");
});

test('the name of the identifying field is "id"', async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].title).toBeDefined();
});

describe("adding a new blog", () => {
  test("is successful", async () => {
    const newBlog = {
      title: "Hullua puuhaa",
      author: "-",
      url: "https://hulluapuuhaa.blogspot.com/2022/07/lisaa-kesavaatetta.html",
      likes: 25,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("Hullua puuhaa");
  });

  test("without likes get 0 likes", async () => {
    const newBlog = {
      title: "Nanna Karalahti",
      author: "Nanna Karalahti",
      url: "https://www.nannakaralahti.fi",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    expect(response.body[2]).toStrictEqual({
      author: "Nanna Karalahti",
      id: response.body[2].id,
      likes: 0,
      title: "Nanna Karalahti",
      url: "https://www.nannakaralahti.fi",
    });
  });

  test("without title gives statuscode 400", async () => {
    const newBlog = {
      author: "Nanna Karalahti",
      url: "https://www.nannakaralahti.fi",
      likes: 9,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("without url gives statuscode 400", async () => {
    const newBlog = {
      title: "Nanna Karalahti",
      author: "Nanna Karalahti",
      likes: 9,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("deleting the blog", () => {
  test("is succesfull", async () => {
    const blogs = await api.get("/api/blogs");
    const deleteBlogId = blogs.body[0].id;
    const deleteBlog = "/api/blogs/" + deleteBlogId;
    await api.delete(deleteBlog).expect(204);

    const response = await api.get("/api/blogs");
    const ids = blogs.body.map((r) => r.id);

    expect(response.body).toHaveLength(initialBlogs.length - 1);
    expect(ids).toContain(deleteBlogId) === false;
  });
});

describe("updating the blog", () => {
  test("is succesfull", async () => {
    const blogs = await api.get("/api/blogs");
    const updateBlog = "/api/blogs/" + blogs.body[0].id;
    const newLikes = {
      likes: 10,
    };
    await api.put(updateBlog).send(newLikes);

    const response = await api.get("/api/blogs");
    const likes = response.body[0].likes;

    expect(likes).toBe(10);
  });
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "tetuanka",
      name: "Terhi Kamula",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
