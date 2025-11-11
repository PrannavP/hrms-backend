import request from "supertest";
import app from "../app";

describe("Get Menu", () => {
    it("should get menu for admin user type.", async () => {
        const response = await request(app)
            .get("/api/menu/getMenu")
    })
})