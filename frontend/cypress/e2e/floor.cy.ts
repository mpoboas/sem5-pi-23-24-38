describe('FloorComponent', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/campus-manager/floors');
        cy.wait(5000);
    });
  
    it('should add a new floor', () => {
        cy.get('.btn-secondary').contains('Create Floor').click();
        cy.get('input[formControlName="floorNumber"]').type('A11');
        cy.get('input[formControlName="description"]').type('Floor A11 test');
        cy.get('mat-select[formControlName="buildingCode"]').click();
        // Escolher uma opção específica
          cy.get('mat-option').contains('A0001').click();
        //cy.get('input[name="width"]').type('100');
        //cy.get('input[name="length"]').type('100');
        cy.get('input[formControlName="map"]').type('map');
        cy.get('form').submit();
        cy.contains('button', 'Save').click();
    });
  
});