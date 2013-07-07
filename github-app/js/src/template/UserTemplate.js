define(function () {
    return _.template(
        "<article class='user-data'>" +
            "<img src='<%= avatarUrl %>' title='<%= userName %>' />" +
            "<h3><%= userName %></h3>" +
            "<div>" +
                "<p>Repositories (<%= reposCount %>):</p>" +
                "<nav class='repositories'></nav>" +
            "</div>" +
        "</article>" +
        "<article class='repository-data'></article>"
    );
});