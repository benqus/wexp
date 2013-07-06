define(function () {
    return _.template(
        "<span class='at'>@</span>" +
        "<input type='text' class='user-search' value='<%= userName %>' />"
    );
});