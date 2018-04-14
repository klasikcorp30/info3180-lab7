from flask_wtf import FlaskForm
from wtforms import TextField,SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileRequired,FileField,FileAllowed



class UploadForm(FlaskForm):
    photo = FileField("Photo", validators=[FileRequired(),
            FileAllowed(['jpg', 'png', 'jpeg'], 'Images only!')])

    description = TextField('Description', validators=[DataRequired()])

