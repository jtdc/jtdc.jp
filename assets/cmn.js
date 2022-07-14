// Contact US Validation
document.getElementById("contactus-name").removeAttribute('required');
document.getElementById("contactus-email").removeAttribute('required');
document.getElementById("contactus-contents").removeAttribute('required');

document.getElementById("contactus-name").addEventListener("blur", function(e){
  e.target.setAttribute('required', true);
});
document.getElementById("contactus-name").addEventListener("focus", function(e){
  e.target.setAttribute('required', true);
});
document.getElementById("contactus-email").addEventListener("blur", function(e){
  e.target.setAttribute('required', true);
});
document.getElementById("contactus-email").addEventListener("focus", function(e){
  e.target.setAttribute('required', true);
});
document.getElementById("contactus-contents").addEventListener("blur", function(e){
  e.target.setAttribute('required', true);
});
document.getElementById("contactus-contents").addEventListener("focus", function(e){
  e.target.setAttribute('required', true);
});

//$("button#contactus-btn").click(function() {
$('#contactus-form').submit(function(event) {
  event.preventDefault();
  document.getElementById("contactus-name").setAttribute('required', true);
  document.getElementById("contactus-email").setAttribute('required', true);
  document.getElementById("contactus-contents").setAttribute('required', true);

  isValid = new Boolean('true');
  if (!document.getElementById("contactus-name").value) {
    document.getElementById("contactus-name").parentNode.classList.add('is-invalid');
    isValid = false;
  }
  if (!document.getElementById("contactus-email").value) {
    document.getElementById("contactus-email").parentNode.classList.add('is-invalid');
    isValid = false;
  } 
  if (!document.getElementById("contactus-contents").value) {
    document.getElementById("contactus-contents").parentNode.classList.add('is-invalid');
    isValid = false;
  } 
  if (!isValid) return;


//if (document.getElementsByClassName("mdl-textfield").classList.contains("is-invalid")) return;
  if ($(".mdl-textfield").hasClass("is-invalid")) return;
    var button = $(this);
    button.attr("disabled", true);
    var spinner = $("#contactus-spinner");
    spinner.addClass("is-active");
    
    var data = {
        name: $("#contactus-name").val(),
        email: $("#contactus-email").val(),
        contents: $("#contactus-contents").val()
    };
    $.ajax({
        type: "post",
        url: "https://izg5ff5g06.execute-api.ap-southeast-1.amazonaws.com/default/CorpSiteContact_to_Slack",
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: "json",
        success: function(json_data) {
            // JSON Arrayの先頭が成功フラグ、失敗の場合2番目がエラーメッセージ
            // if (!json_data[0]) {
            //     $("#contactus-message").html("申し訳ございません。お問合せの受付に失敗しました。<br /><br />時間をおいて再度お試しいただくか、<a href='mailto:staff@jtdc.jp'>staff@jtdc.jp</a>までメールにてお問い合わせいただけますよう、お願い致します。")
            //     return;
            // }
            // 成功時処理
            $("#contactus-message").text("お問合せありがとうございました。")
        },
        error: function() {
            // alert("Server Error. Pleasy try again later. \n" + JSON.stringify(data));
            $("#contactus-message").html("申し訳ございません。お問合せの受付に失敗しました。<br /><br />時間をおいて再度お試しいただくか、<a href='mailto:staff@jtdc.jp'>staff@jtdc.jp</a>までメールにてお問い合わせいただけますよう、お願い致します。")
        },
        complete: function() {      // 成功・失敗に関わらず通信が終了した際の処理
            button.attr("disabled", false);  // ボタンを再び enableにする
            spinner.removeClass("is-active");
        }
    });
});

//Dialog
function showLoading() {
    // remove existing loaders
    $('.loading-container').remove();
    $('<div id="orrsLoader" class="loading-container"><div><div class="mdl-spinner mdl-js-spinner is-active"></div></div></div>').appendTo("body");

    componentHandler.upgradeElements($('.mdl-spinner').get());
    setTimeout(function () {
        $('#orrsLoader').css({opacity: 1});
    }, 1);
}

function hideLoading() {
    $('#orrsLoader').css({opacity: 0});
    setTimeout(function () {
        $('#orrsLoader').remove();
    }, 400);
}

function showDialog(options) {
    options = $.extend({
        id: 'orrsDiag',
        title: null,
        text: null,
        neutral: false,
        negative: false,
        positive: false,
        cancelable: true,
        contentStyle: null,
        onLoaded: false,
        hideOther: true
    }, options);

    if (options.hideOther) {
        // remove existing dialogs
        $('.dialog-container').remove();
        $(document).unbind("keyup.dialog");
    }

    $('<div id="' + options.id + '" class="dialog-container mdl-color-text--grey-600"><div class="mdl-card mdl-shadow--16dp" id="' + options.id + '_content"></div></div>').appendTo("body");
    var dialog = $('#' + options.id);
    var content = dialog.find('.mdl-card');
    if (options.contentStyle != null) content.css(options.contentStyle);
    if (options.title != null) {
        $(options.title).appendTo(content);
    }
    if (options.text != null) {
        $('<p>' + options.text + '</p>').appendTo(content);
    }
    if (options.neutral || options.negative || options.positive) {
        var buttonBar = $('<div class="mdl-card__actions dialog-button-bar"></div>');
        if (options.neutral) {
            options.neutral = $.extend({
                id: 'neutral',
                title: 'Neutral',
                onClick: null
            }, options.neutral);
            var neuButton = $('<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="' + options.neutral.id + '">' + options.neutral.title + '</button>');
            neuButton.click(function (e) {
                e.preventDefault();
                if (options.neutral.onClick == null || !options.neutral.onClick(e))
                    hideDialog(dialog)
            });
            neuButton.appendTo(buttonBar);
        }
        if (options.negative) {
            options.negative = $.extend({
                id: 'negative',
                title: 'Cancel',
                onClick: null
            }, options.negative);
            var negButton = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="' + options.negative.id + '">' + options.negative.title + '</button>');
            negButton.click(function (e) {
                e.preventDefault();
                if (options.negative.onClick == null || !options.negative.onClick(e))
                    hideDialog(dialog)
            });
            negButton.appendTo(buttonBar);
        }
        if (options.positive) {
            options.positive = $.extend({
                id: 'positive',
                title: 'OK',
                onClick: null
            }, options.positive);
            var posButton = $('<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="' + options.positive.id + '">' + options.positive.title + '</button>');
            posButton.click(function (e) {
                e.preventDefault();
                if (options.positive.onClick == null || !options.positive.onClick(e))
                    hideDialog(dialog)
            });
            posButton.appendTo(buttonBar);
        }
        buttonBar.appendTo(content);
    }
    componentHandler.upgradeDom();
    if (options.cancelable) {
        dialog.click(function () {
            hideDialog(dialog);
        });
        $(document).bind("keyup.dialog", function (e) {
            if (e.which == 27)
                hideDialog(dialog);
        });
        content.click(function (e) {
            e.stopPropagation();
        });
    }
    setTimeout(function () {
        dialog.css({opacity: 1});
        if (options.onLoaded)
            options.onLoaded();
    }, 1);
}

function hideDialog(dialog) {
    $(document).unbind("keyup.dialog");
    dialog.css({opacity: 0});
    setTimeout(function () {
        dialog.remove();
    }, 400);
}
