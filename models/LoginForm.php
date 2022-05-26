<?php

namespace app\models;

use Yii;
use yii\base\Model;
use app\models\Usuarios;

/**
 * LoginForm is the model behind the login form.
 *
 * @property-read User|null $user
 *
 */
class LoginForm extends Model
{
    public $username;
    public $password;
    public $rememberMe = true;

    private $_user = false;


    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // username and password are both required
            [['username', 'password'], 'required'],
            // rememberMe must be a boolean value
            ['rememberMe', 'boolean'],
            // password is validated by validatePassword()
            ['password', 'validatePassword'],
        ];
    }

    /**
     * Validates the password.
     * This method serves as the inline validation for password.
     *
     * @param string $attribute the attribute currently being validated
     * @param array $params the additional name-value pairs given in the rule
     */
    public function validatePassword($attribute, $params)
    {
        if (!$this->hasErrors()) {
            $user = $this->getUser();

            if (!$user || !$user->validatePassword($this->password)) {
                $this->addError($attribute, 'Nombre de usuario o contraseña incorrectas.');
            } else if($user->rol!="A") {
                $this->addError($attribute, 'Solo puede acceder el administrador.');
            } else if($user->estado==="B") {
	        		$this->addError($attribute, 'Usuario bloqueado.');
            } else if($user->estado==="P") {
                $this->addError($attribute, 'Usuario pendiente de validación.');
            }
        }
    }

    /**
     * Logs in a user using the provided username and password.
     * @return bool whether the user is logged in successfully
     */
    public function login()
    {
        if ($this->validate()) {
            return Yii::$app->user->login($this->getUser(), $this->rememberMe ? 3600*24*30 : 0);
        }
        return false;
    }

    /**
     * Finds user by [[username]]
     *
     * @return Usuarios|null
     */
    public function getUser()
    {
        if ($this->_user === false) {
            $this->_user = Usuarios::findByUsername($this->username);
        }

        return $this->_user;
    }
}
