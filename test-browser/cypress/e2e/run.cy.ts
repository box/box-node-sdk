describe('Run test and report results', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should run all tests and report results', () => {
    const MAX_TIME_RETRY = 3;
    const retryFailedTests = (attempt: number = 1) => {
      if (attempt > MAX_TIME_RETRY) {
        return;
      }

      cy.get('tr').then(($rows) => {
        const failedTests = $rows.filter(':contains("FAILED")').length;
        if (failedTests === 0) {
          return;
        }

        cy.get('tr')
          .filter(':contains("FAILED")')
          .each(($row) => {
            $row.find('button').click();
          });
        cy.wait(1000);
        cy.get('td').should('not.contain', 'RUNNING');
        retryFailedTests(attempt + 1);
      });
    };

    // Wait for the test results table to be visible
    cy.get('table').should('be.visible');
    // Wait more than 1 run button to be loaded
    cy.get('button').should('exist');
    // Wait for all tests to be loaded (no more "not_started" status)
    cy.get('td').should('not.contain', 'NOT_STARTED');
    // // Wait for all tests to complete (no more "running" status)
    cy.get('td').should('not.contain', 'RUNNING');

    // Retry failed tests
    retryFailedTests();

    // Get test results
    cy.get('tr').then(($rows) => {
      const totalTests = $rows.length - 1; // Subtract header row
      const passedTests = $rows.filter(':contains("PASSED")').length;
      const failedTests = $rows.filter(':contains("FAILED")').length;
      const skippedTests = $rows.filter(':contains("SKIPPED")').length;

      // Assert that all tests completed
      expect(passedTests + failedTests + skippedTests).to.equal(totalTests);

      // If there are failed tests, log their details
      if (failedTests > 0) {
        cy.task(
          'log',
          `Test Results Summary:
            Total Tests: ${totalTests}
            Passed: ${passedTests}
            Failed: ${failedTests}
            Skipped: ${skippedTests}\n
          `,
        );
        cy.get('tr')
          .each(($row) => {
            console.log($row.find('td').eq(1).text());
            if ($row.find('td').eq(1).text() === 'FAILED') {
              const testName = $row.find('td').eq(0).text();
              const error = $row.find('td').eq(3).text();
              cy.task('log', `Failed Test: ${testName} - Error: ${error}\n`);
            }
          })
          .then(() => {
            // Fail the test
            expect(true).to.equal(false);
          });
      }
    });
  });
});
