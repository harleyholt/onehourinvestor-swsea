import logging
import os

import webapp2
import jinja2

from google.appengine.api import mail


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


class SignUpHelper(webapp2.RequestHandler):

    def get(self):
        self.redirect('/')

    def post(self):
        email_address = self.request.get('email')
        if not mail.is_email_valid(email_address):
            self.redirect('/')
        else:
            sender_address = 'Interest Bot <interestbot@onehourinvestorswsea.appspotmail.com>'
            receiver_address = 'onehourinvestor@gmail.com'
            subject = '%s is intested!' % email_address
            body = 'Nothing interesting to say about this?'

            try:
                mail.send_mail(sender_address, receiver_address, subject, body)
            except:
                logging.error('Failed to send interest email to %s'
                              % email_address)

            self.redirect('/')


class DashboardHandler(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'text/html'

        template = JINJA_ENVIRONMENT.get_template('dashboard.html')
        self.response.write(template.render({}))


def handle_404(request, response, exception):
    response.headers['Content-Type'] = 'text/html'

    template = JINJA_ENVIRONMENT.get_template('404.html')
    response.write(template.render({}))


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/i-am-interested', SignUpHelper),
    ('/user/jimmy/lesson/beginner', LessonHandler),
    ('/user/jimmy', DashboardHandler)
], debug=True)

application.error_handlers[404] = handle_404
