import request from "supertest";
import app from "../app";

let token:string;

// Run this. call login first as admin and then use the token to test other protected endpoints
beforeAll(async () => {
    // Login to get token
    const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({
            email: "admin@hrms.com",
            password: "Admin@123"
        });
        
    token = loginResponse.body.token;  // store token for later tests
});

// Testing employee related crucial endpoints
describe('Employee API', () => {
    it('should onboard a new employee', async () => {
        const response = await request(app)
            .post('/api/employee/onboardNewEmployee')
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: "Manish@employee.com",
                password: "Manish@123",
                full_name: "Manish Kumar",
                userType: "employee",
                joined_date: "2020-01-24T00:00:00Z",
                contact_number: "9011221111",
                address: "Kathmandu, Putalisadak",
                gender: "female",
                type: "contract",
                date_of_birth: "2000-12-11T00:00:00Z",
                status: "not_working",
                Branch: 3,
                Department: 3,
                Designation: 3
            });

            console.log("Onboard employee test response =>", response);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('message', 'Employee Create Successfully');
        expect(response.body.newEmployee).toHaveProperty('id');
    });

    it('Should throw error', async () => {
        const response = await request(app)
            .post('/api/employee/onboardNewEmployee')
            .set("Authorization", `Bearer ${token}`)
            .send({
                // email: "employee@test.jest",
                // password: "EmployeeTest@123",
                // full_name: "Employee Test Jest",
                // userType: UserType.employee,
                // joined_date: new Date("2020-01-24"),
                // contact_number: "9011221111",
                // address: "Kathmandu, Putalisadak",
                // gender: GenderType.female,
                // type: EmployeeType.contract,
                // date_of_birth: new Date("2000-12-11"),
                // status: EmployeeStatus.not_working,
                // Branch: 3,
                // Department: 3,
                // Designation: 3
            });

        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('success', false);
    });
});