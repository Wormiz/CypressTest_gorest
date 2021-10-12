import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { attFileAllure } from "../../../support/index";
import { commonDataUser } from "../../common/commonRest";
import { _ } from "lodash";

let id = "";

When(
    /^realizo um GET na "([^"]*)" informando o id no path id$/, 
    (path) => {
        cy.api({
            failOnStatusCode: false,
            method: "GET",
            url: "/" + Cypress.env("path_public") + path + commonDataUser.id,
        }).as("get_user");
});


Then(
    /^verifico se retornou o status code "([^"]*)" junto das informações previamente criadas dentro do response.body$/, 
    (status) => {
        cy.get("@get_user").then((response) => {
            attFileAllure(response.body, "response", "GetUser");
            expect(response.status).to.equal(parseInt(status));
        })
});


Given(
    /^que informo um id inválido no path id$/, () => {
	    id = "123"
});


When(
    /^realizo um GET na "([^"]*)" informando um id inválido no path id$/, 
    (path) => {
        cy.api({
            failOnStatusCode: false,
            method: "GET",
            url: "/" + Cypress.env("path_public") + path + id,
        }).as("get_user_invalidPathId");
});


Then(
    /^verifico se retornou o status code not found "([^"]*)"$/, 
    (status) => {
        cy.get("@get_user_invalidPathId").then((response) => {
            attFileAllure(response.body, "response", "GetUser");
            expect(response.status).to.equal(parseInt(status));
        })
});



