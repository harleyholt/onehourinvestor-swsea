import logging
import os

import webapp2
import jinja2


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'])


class MainPage(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'text/html'

        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render({}))


class LessonHandler(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'text/html'

        template = JINJA_ENVIRONMENT.get_template('lesson.html')
        self.response.write(template.render({}))


class DashboardHandler(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'text/html'

        template = JINJA_ENVIRONMENT.get_template('dashboard.html')
        self.response.write(template.render({}))


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/user/jimmy/lesson/beginner', LessonHandler),
    ('/user/jimmy', DashboardHandler)
], debug=True)
