define(function () {
    return _.template(
        "<li class='RepositoryItem'>" +
            "<p data-fork='<%= fork %>'><%= name %></p>" +
        "</li>"
    );
});