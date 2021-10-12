import { getId } from "../cucumber-test/postUser/postUserSteps";
import { defineStep } from "cypress-cucumber-preprocessor/steps";
import { _ } from "lodash";
import { attFileAllure } from "../../support/index";
import { requestPostUser } from "../../fixtures/requestPostUser"

export let commonDataUser = {};

defineStep("realizo um DELETE de um user", () => {
    cy.api({
      method: "DELETE",
      url:
        Cypress.env("path_user") +
        getId(),
      headers: {
        Authorization: "Bearer " + Cypress.env("Access_token"),
      },
    }).as("delete_user");
  
    cy.get("@delete_user").then((response) => {
      attFileAllure("No content", "response", "delete_user_response");
      expect(response.status).to.eql(204);
    });
  });

  defineStep("realizo um DELETE de um user previamente criado", () => {
    cy.api({
      method: "DELETE",
      url:
        Cypress.env("path_user") +
        commonDataUser.id,
      headers: {
        Authorization: "Bearer " + Cypress.env("Access_token"),
      },
    }).as("delete_user");
  
    cy.get("@delete_user").then((response) => {
      attFileAllure("No content", "response", "delete_user_response");
      expect(response.status).to.eql(204);
    });
  });

defineStep("realizo um POST de um user", () => {
    let reqBody = requestPostUser();

    cy.api({
        failOnStatusCode: false,
        method: "POST",
        url: Cypress.env("path_user"),
        headers: {
            Authorization: "Bearer " + Cypress.env("Access_token"),
            "Content-type": "application/json"
        },

        body: reqBody
    }).as("post_userCommon");

    attFileAllure(reqBody, "request", "PostUser");

    cy.get("@post_userCommon").then((response) => {
        commonDataUser.id = response.body.data.id;
        attFileAllure(response.body, "response", "PostUser");
    })
});