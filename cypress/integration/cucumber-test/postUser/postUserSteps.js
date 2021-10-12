import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { requestPostUser } from "../../../fixtures/requestPostUser";
import { attFileAllure } from "../../../support/index";
import { _ } from "lodash";

let token = ""; 
let header = "";
let validations = {};

Given(
    /^que possuo um accessToken criado a partir do site gorest$/, () => {
        token = Cypress.env("Access_token");
});


Given(
    /^que possuo um accessToken inválido$/, () => {
        token = "1234"
});



And(
    /^informo o accessToken no header$/, () => {
        header = "Bearer " + token;
});


When(
    /^realizo um POST na "([^"]*)" enviando todos os campos válidos$/, 
    (path) => {
        let reqBody = requestPostUser();

        cy.api({
            failOnStatusCode: false,
            method: "POST",
            url: "/" + Cypress.env("path_public") + path,
            headers: {
                Authorization: header,
                "Content-type": "application/json"
            },

            body: reqBody
        }).as("post_user");

        attFileAllure(reqBody, "request", "PostUser");
        
});


When(
    /^realizo um POST na "([^"]*)" sem enviar o body$/, 
    (path) => {
        let reqBody = "";
        cy.api({
            failOnStatusCode: false,
            method: "POST",
            url: "/" + Cypress.env("path_public") + path,
            headers: {
                Authorization: header,
                "Content-type": "application/json"
            },

            body: reqBody
        }).as("post_user");

        attFileAllure(" ", "request", "PostUser");
});



Then(
    /^verifico se retornou o status code "([^"]*)" junto dos dados informados na request dentro do response.body$/, 
    (status) => {
        cy.get("@post_user").then((response) => {
            validations = response.body.data;
            attFileAllure(response.body, "response", "PostUser");
            expect(response.status).to.equal(parseInt(status));
        })
});


Then(
    /^verifico se retornou o status code "([^"]*)" junto da mensagem "([^"]*)"$/, 
    (status, description) => {
        cy.get("@post_user").then((response) => {
            attFileAllure(response.body, "response", "PostUser");
            expect(response.status).to.equal(parseInt(status));
            expect(response.body.data.message).to.equal(description);
        })
});


Then(
    /^verifico se retornou o status code "([^"]*)" junto da mensagem "([^"]*)" informando que os campos "([^"]*)", "([^"]*)", "([^"]*)" e "([^"]*)" não podem ser vazios$/, 
    (status, description, email, name, gender, status_field) => {
        cy.get("@post_user").then((response) => {
            attFileAllure(response.body, "response", "PostUser");
            expect(response.status).to.equal(parseInt(status));
            expect(response.body.data[0].message).to.equal(description);
        })
});



function getId(){
    return validations.id;
}

module.exports = { getId };

