const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;
  const id = uuid();
  const repository = { id, url, title, techs, likes: 0 };
  repositories.push(repository);
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;
  const repository = repositories.find((repo) => repo.id === id);
  if (!repository) {
    return response.status(400).json();
  }
  repository.url = url;
  repository.title = title;
  repository.techs = techs;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  if (!isUuid(id)) {
    return response.status(400).json();
  }
  const repository = repositories.find((x) => {
    x.id === id;
  });
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
