(function ($) {

    function review_behaviors() {
        $('.review-stars-form .stars')
            .once('review-stars-form-stars')
            .on('getRating', function () {
                let $this = $(this);
                let stars = $this.find('.star');

                for (const key in stars) {
                    if (!(key >= 0)) continue;

                    let star = $(stars[key]);

                    if (star.hasClass('enabled')) continue;

                    return key;
                }

                return 5;
            })
            .on('enableHoverPriority', function () {
                $(this).addClass('hover-priority');
            })
            .on('disableHoverPriority', function () {
                $(this).removeClass('hover-priority');
            });


        $('.review-stars-form .stars .star')
            .once('review-stars-form-star')

            .on('updateClass', function (e, active, className) {
                let $this = $(this);
                let wrapper = $this.closest('.stars');
                let stars = wrapper.find('.star');

                stars.removeClass(className);

                if (!active) return;

                for (const key in stars) {
                    if (!(key >= 0)) continue;

                    let star = $(stars[key]);

                    star.addClass(className);

                    if (star[0] === this) {
                        break;
                    }
                }
            })
            .hover(
                function () {
                    let $this = $(this);
                    let wrapper = $this.closest('.stars');

                    wrapper.trigger('enableHoverPriority');

                    $this.trigger('updateClass', [true, 'hover']);

                },
                function () {
                    let $this = $(this);
                    let wrapper = $this.closest('.stars');

                    wrapper.trigger('disableHoverPriority');

                    $this.trigger('updateClass', [false, 'hover']);
                }
            )
            .click(function () {
                let $this = $(this);
                let wrapper = $this.closest('.stars');
                let form = $this.closest('form');

                wrapper.trigger('disableHoverPriority');

                $this.trigger('updateClass', [true, 'enabled']);

                form.find('input[name="rating"]').val(
                    wrapper.triggerHandler('getRating')
                );
            });


        $('.review-stars-form')
            .once('review-stars-form')
            .on('setError', function (e, message) {
                $(this).find('.error').html(message);
            });


        $('.review-stars-form button[type="submit"]')
            .once('review-stars-form-submit')
            .click(function (e) {
                e.preventDefault();

                let form = $(this).closest('form');
                let rating = parseInt(form.find('input[name="rating"]').val());

                form.removeClass('has-error');

                if (!rating) {
                    form.addClass('has-error');
                    form.trigger('setError', 'Нужно поставить оценку');
                    return;
                }

                if (rating <= 3) {
                    $('.review-modal').trigger('open');
                    return;
                }

                top.location.href = form.attr('data-good-rating-url');
            });


        $('.review-director-form')
            .once('review-director-for')
            .on('setError', function (e, message) {
                $(this).find('.error').html(message);
            });


        $('.review-director-form button[type="submit"]')
            .once('review-director-form-submit')
            .click(function (e) {
                e.preventDefault();

                let form = $(this).closest('form');
                let text = form.find('textarea[name="text"]').val() || '';

                form.removeClass('has-error');

                if (text.length === 0) {
                    form.addClass('has-error');
                    form.trigger('setError', 'Напишите, пожалуйста, что мы можем улучшить');
                    return;
                }

                $.ajax({
                    url: '/review/director.php',
                    method: 'post',
                    data: form.serialize(),
                    success: function (data) {
                        form.addClass('completed');
                    }
                });
            });


        $('.review-modal')
            .once('review-modal')
            .on('open', function () {
                $(this).addClass('open');
            })
            .on('close', function () {
                $(this).removeClass('open');
            });


        $('.review-modal-close')
            .once('review-modal-close')
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('.review-modal')
                    .trigger('close');
            });

    }


    $(document).ready(function () {
        review_behaviors();
    });


    $(document).ajaxComplete(function () {
        review_behaviors();
    });

})(jQuery);