import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { attFileAllure } from "../../../support/index";
import { commonDataUser } from "../../common/commonRest";
import { _ } from "lodash";

let token = "";
let header = "";
let id = "";

Given(
    /^que possuo o id do usuário previamente criado$/, () => {
        id = commonDataUser.id;
});

When(
    /^realizo um DELETE na "([^"]*)" informando o id no path id$/, 
    (path) => {
        cy.api({
            failOnStatusCode: false,
            method: "DELETE",
            url: "/" + Cypress.env("path_public") + path + id,
            headers: {
                Authorization: "Bearer " + Cypress.env("Access_token")
            },
        }).as("delete_user");
});

When(
    /^realizo um DELETE na "([^"]*)" informando o id no path id sem informar o accessToken$/, 
    (path) => {
        cy.api({
            failOnStatusCode: false,
            method: "DELETE",
            url: "/" + Cypress.env("path_public") + path + id,
            headers: {
                Authorization: ""
            },
        }).as("delete_user");
});

When(
    /^realizo um DELETE na "([^"]*)" informando o id no path id com um accessToken inválido$/, 
    (path) => {
        cy.api({
            failOnStatusCode: false,
            method: "DELETE",
            url: "/" + Cypress.env("path_public") + path + id,
            headers: {
                Authorization: "Bearer 1234"
            },
        }).as("delete_user");
});

When(
    /^realizo um DELETE na "([^"]*)" informando um id inválido no path id$/, 
    (path) => {
        cy.api({
            failOnStatusCode: false,
            method: "DELETE",
            url: "/" + Cypress.env("path_public") + path + 123,
            headers: {
                Authorization: header
            },
        }).as("delete_user");
});

Then(
    /^verifico se retornou o status code de no content "([^"]*)"$/, 
    (status) => {
        cy.get("@delete_user").then((response) => {
            attFileAllure("No content", "response", "DeleteUser");
            expect(response.status).to.equal(parseInt(status));
        })
});


Then(
    /^verifico se retornou o status code de sem autorização "([^"]*)"$/, 
    (status) => {
        cy.get("@delete_user").then((response) => {
            attFileAllure(response.body, "response", "DeleteUser");
            expect(response.status).to.equal(parseInt(status));
        })
});




Then(
    /^verifico se retornou o status code not found "([^"]*)"$/, 
    (status) => {
        cy.get("@delete_user").then((response) => {
            attFileAllure(response.body, "response", "DeleteUser");
            expect(response.status).to.equal(parseInt(status));
        })
});

And(
    /^que possuo o id do usuário previamente criado, junto do accessToken$/, () => {
        id = commonDataUser.id;
});










