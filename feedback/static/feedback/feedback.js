
FeedbackForm = function (url) {

    var $container = $('[data-role=feedback]');

    function loadForm() {
        $.get(url, renderForm);
    }

    function renderForm(response) {
        $container.html(response);
        $container.on('submit', 'form', handleFormSubmit);
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        $.ajax({
            method: 'POST',
            url: url,
            data: $container.find('form').serialize(),
            success: handleFormSubmitSuccess,
            error: handleFormSubmitError
        });
    }

    function handleFormSubmitSuccess(response) {
        if ($.notify) {
            $.notify({message: response}, {type: 'success'});
        }
        loadForm();
    }

    function handleFormSubmitError(response) {
        $container.find('form').replaceWith(response.responseText);
    }

    loadForm();
};
