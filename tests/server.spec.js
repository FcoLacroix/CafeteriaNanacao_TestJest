const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("GET /cafes - debería devolver status 200 y un array con al menos un objeto", async () => {
    const response = await request(server).get("/cafes").send();
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("DELETE /cafes/:id - debería devolver status 404 si el ID no existe", async () => {
    const response = await request(server).delete("/cafes/999").set("Authorization", "token").send();
    expect(response.status).toBe(404);
  });

  it("POST /cafes - debería agregar un nuevo café y devolver status 201", async () => {
    const nuevoCafe = { id: 5, nombre: "Latte" };
    const response = await request(server).post("/cafes").send(nuevoCafe);
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(nuevoCafe);
  });

  it("PUT /cafes/:id - debería devolver status 400 si el ID de parámetros es diferente al del payload", async () => {
    const cafeActualizado = { id: 10, nombre: "Espresso" };
    const response = await request(server).put("/cafes/1").send(cafeActualizado);
    expect(response.status).toBe(400);
  });
});
