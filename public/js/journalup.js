
/**
 * Created by MuyBien on 1/31/16.
 */


$(document).ready(function() {
    initializePage();

})

function initializePage() {
   console.log("initializing pages...");

    $('.AddTestJournal').click(function(e) {
        e.preventDefault();
        console.log("add new test journal button clicked!");

        $.post('/journal/new_test_journal', "", function() {
            console.log("try to refresh the page!");
            window.location.href = '/myjournal'; // reload the page
        });
    });

    $('.datepicker').datepicker({
        format: "dd/mm/yyyy"
    });

}
