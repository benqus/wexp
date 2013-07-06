define(function () {
    return _.template(
        "<li>" +
            "<a href='<%= htmlUrl %>' target='_blank' data-fork='<%= fork %>'><%= name %></a>" +
        "</li>"
    );
});