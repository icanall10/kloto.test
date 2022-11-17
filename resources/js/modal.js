(function ($) {

    function modal_behaviors() {

        $('[data-modal-link]')
            .once('modal-link')
            .click(function (e) {
                e.preventDefault();

                let $this = $(this);
                let key = $this.attr('data-modal-link');
                let modal = $('[data-modal=' + key + ']');

                if (modal.length === 0) return;

                let title = modal.attr('data-modal-title');
                let width = modal.attr('data-modal-width') || 500;

                modal
                    .dialog({
                        modal: true,
                        title: title,
                        width: width + 'px'
                    })
                    .position({my: 'center', at: 'center', of: window});
            });


        $('[data-modal-close]')
            .once('modal-close')
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('[data-modal]')
                    .dialog('close');
            });

    }


    $(document).ready(function () {
        modal_behaviors();
    });


    $(document).ajaxComplete(function () {
        modal_behaviors();
    });

})(jQuery);