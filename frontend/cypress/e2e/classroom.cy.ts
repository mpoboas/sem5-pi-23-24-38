describe('ClassroomComponent', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/campus-manager/classrooms');
        cy.wait(5000);
    });
  
    it('should add a new classroom', () => {
        cy.get('.btn-secondary').contains('Create Classroom').click();
        cy.get('input[formControlName="name"]').type('A021');
        cy.get('input[formControlName="description"]').type('Sala teste e2e');
        cy.get('input[formControlName="category"]').type('laboratório');
        cy.get('input[formControlName="width"]').type('2');
        cy.get('input[formControlName="length"]').type('2');
        cy.get('mat-select[formControlName="floorNumber"]').click();
        // Escolher uma opção específica
          cy.get('mat-option').contains('A2').click();
        cy.get('form').submit();
        cy.contains('button', 'Save').click();
    });
  
});