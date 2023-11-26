describe('RobotComponent', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/fleet-manager/robot');
        cy.wait(5000);
    });
  
    it('should add a new robot', () => {
        cy.get('.btn-secondary').contains('Create Robot').click();
        cy.get('input[formControlName="nickname"]').type('Robot021');
        cy.get('input[formControlName="serialNr"]').type('00021');
        cy.get('input[formControlName="description"]').type('Robot teste e2e');
        cy.get('mat-select[formControlName="robotTypeId"]').click();
        // Escolher uma opção específica
          cy.get('mat-option').contains('5050cb05-2fa1-4b73-8ad7-1178b8051fe2').click();
        cy.get('form').submit();
        cy.contains('button', 'Save').click();
    });
  
});