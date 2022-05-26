<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "iconosnoticias".
 *
 * @property int $id
 * @property string $tema Hay dos temas: 'Información' y 'Traspasos'
 * @property string $imagen
 */
class Iconosnoticias extends \yii\db\ActiveRecord
{
    public static $temaOptions = ['I' => 'Información', 'T' => 'Traspasos'];

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'iconosnoticias';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['tema', 'imagen'], 'required'],
            [['tema'], 'string'],
            [['imagen'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'tema' => 'Tema',
            'imagen' => 'Imagen',
        ];
    }

    //Obtiene el texto del campo Tema
    public function getTemaText(){
        return self::$temaOptions[$this->tema] ?? '';
    }
}
