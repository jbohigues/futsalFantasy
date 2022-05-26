<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "iconosestadojugador".
 *
 * @property int $id
 * @property string $imagen
 * @property string $estado
 */
class Iconosestadojugador extends \yii\db\ActiveRecord
{
    public static $estadoOptions = ['P' => 'Pendiente', 'OK' => 'Buena forma', 'L' => 'Lesionado', 'EX' => 'Expulsado'];

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'iconosestadojugador';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['imagen', 'estado'], 'required'],
            [['estado'], 'string'],
            [['imagen'], 'string', 'max' => 50],
            [['estado'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'imagen' => 'Imagen',
            'estado' => 'Estado',
        ];
    }

     //Obtiene el texto del campo Estado
    public function getEstadoText(){
        return self::$estadoOptions[$this->estado] ?? '';
    }
}
