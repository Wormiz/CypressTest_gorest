import './commands'
import addContext from 'mochawesome/addContext'
import '@shelex/cypress-allure-plugin'
import '@bahmutov/cy-api/support'

Cypress.on('test:after:run', (test, runnable) => {
	if (test.state === 'failed') {
		const screenshot = `${Cypress.config('screenshotsFolder')}/${
			Cypress.spec.name
		}/${runnable.parent.title} -- ${test.title} (failed).png`
		addContext({ test }, screenshot)
	}
})

export function attFileAllure(obj, type, information) {
    const timestamp = Date.now();
  
    cy.writeFile(
      `cypress/files/api/${type}_${timestamp}_${information}.txt`,
      obj
    );
  
    cy.allure().fileAttachment(
      `api ${type} ${information} `,
      `cypress/files/api/${type}_${timestamp}_${information}.txt`,
      "text/plain"
    );
  }
