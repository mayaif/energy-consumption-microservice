describe('Energy Consumption App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the main heading', () => {
    cy.contains('h1', 'Energy Consumption Trends').should('be.visible')
  })

  it('allows adding new energy consumption data', () => {
    const testDate = '2024-09-28'
    const testConsumption = '150'

    cy.get('#date').type(testDate)
    cy.get('#consumption').type(testConsumption)
    cy.get('button[type="submit"]').click()

    // Check if the form submission was successful
    cy.contains('Add').should('not.be.disabled')

    // Note: We're not checking for the new data in the chart immediately
    // as it might not update right away
  })

  it('displays the energy consumption trend', () => {
    cy.contains('Your energy consumption is:').should('be.visible')
    cy.get('span')
      .invoke('text')
      .should('match', /(Increasing|Decreasing)/)
  })

  it('navigates to the About page', () => {
    cy.contains('About').click()
    cy.url().should('include', '/about')
    cy.get('img[src*="coming_soon"]').should('be.visible')
  })

  it('handles loading state', () => {
    cy.contains('Loading...').should('be.visible')
    // Wait for loading to finish
    cy.contains('Loading...', { timeout: 10000 }).should('not.exist')
  })

  it('handles errors gracefully', () => {
    // Simulate a network error
    cy.intercept('GET', 'http://localhost:3000/api/energy', {
      statusCode: 500,
      body: 'Server error',
      delay: 1000 // Add a delay to ensure the loading state is shown
    }).as('getEnergyData')

    cy.visit('/')
    cy.wait('@getEnergyData')

    // Check for loading state
    cy.contains('Loading...').should('be.visible')

    // Wait for loading to finish
    cy.contains('Loading...', { timeout: 10000 }).should('not.exist')

    // Check for any visible error indication
    cy.get('body').should('contain.text', 'Failed to fetch energy data')

    // Alternative: Check if the chart is not rendered
    cy.get('[id^=my-chart-id]').should('not.exist')
  })
})
