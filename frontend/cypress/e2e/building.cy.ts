describe('BuildingComponent', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/campus-manager/buildings');
        cy.wait(5000);
    });
  
    it('should add a new building', () => {
        cy.get('.btn-secondary').contains('Create Building').click();
        cy.get('input[formControlName="letter"]').type('X');
        cy.get('input[formControlName="description"]').type('Building X test');
        cy.get('input[formControlName="width"]').type('100');
        cy.get('input[formControlName="length"]').type('100');
        cy.get('input[formControlName="code"]').type('X1234');
        cy.get('form').submit();
        cy.contains('button', 'Save').click();
    });

    it('should list buildings', () => {
        cy.get('.btn-secondary').contains('List Buildings by range').click();
        cy.get('input[formControlName="minFloor"]').type('1');
        cy.get('input[formControlName="maxFloor"]').type('3');
        cy.get('form').submit();
        cy.contains('button', 'Get list').click();
    });
  
});