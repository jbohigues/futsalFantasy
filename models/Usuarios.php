<?php

namespace app\models;

use Yii;
use yii\helpers\ArrayHelper;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "usuarios".
 *
 * @property int $id
 * @property string $nombre Hace falta?
 * @property string|null $apellidos Hace falta?
 * @property string $usuario
 * @property string $email
 * @property string $password
 * @property string $token
 * @property string $estado
 * @property string $rol
 *
 * @property Equiposusuarios[] $equiposusuarios
 * @property Ligas[] $ligas
 */
class Usuarios extends \yii\db\ActiveRecord implements \yii\web\IdentityInterface
{
    public static $estadoOptions = ['P' => 'Pendiente', 'A' => 'Activo', 'B' => 'Bloqueado'];
    public static $rolOptions = ['U' => 'Cliente', 'A' => 'Administrador'];

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'usuarios';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nombre', 'usuario', 'email', 'password', 'token'], 'required'],
            [['estado', 'rol'], 'string'],
            [['nombre', 'apellidos', 'usuario', 'email', 'token'], 'string', 'max' => 50],
            [['password'], 'string', 'max' => 32],
            [['usuario'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nombre' => 'Nombre',
            'apellidos' => 'Apellidos',
            'usuario' => 'Usuario',
            'email' => 'Email',
            'password' => 'Password',
            'token' => 'Token',
            'estado' => 'Estado',
            'rol' => 'Rol',
        ];
    }

    /**
     * Gets query for [[Equiposusuarios]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getEquiposusuarios()
    {
        return $this->hasMany(Equiposusuarios::className(), ['idUsuario' => 'id']);
    }

    /**
     * Gets query for [[Ligas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getLigas()
    {
        return $this->hasMany(Ligas::className(), ['idUsuarioLider' => 'id']);
    }

    //Antes de guardar, comprueba que la contraseña tenga md5
    function beforeSave($insert) {
        if(strlen($this->password)!=32)
            $this->password=md5($this->password);
        return parent::beforeSave($insert);
    }

    //Obtenemos el texto del campo Estado
    public function getEstadoText(){
        return self::$estadoOptions[$this->estado] ?? '';
    }

    //Obtenemos el texto del campo Rol
    public function getRolText(){
        return self::$rolOptions[$this->rol] ?? '';
    }

    public static function findByUsername($username) {
	    return static::findOne(['usuario' => $username]);
    }
    
    public static function findIdentity($id) {
        return static::findOne($id);
    }
    
    public function getId() {
        return $this->id;
    }
    
    public function getAuthKey() { }
    
    public function validateAuthKey($authKey) { }
    public static function findIdentityByAccessToken($token, $type = null) {}  
    
    // Comprueba que el password que se le pasa es correcto
    public function validatePassword($password) {
        return $this->password === md5($password); // Si se utiliza otra función de encriptación distinta a md5, habrá que cambiar esta línea
    }

    //Comprobamos si el rol del usuario es el mismo que el que le pasamos por parametro
    public function hasRole($role){
        return $this->rol==$role;
      //return in_array($this->roles,$role);  Si es un array de roles
    }

    public static function lookup(){
        return ArrayHelper::map(self::find()->asArray()->all(),'id','usuario');
    }
}
