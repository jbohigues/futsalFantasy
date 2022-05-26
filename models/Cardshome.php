<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "cardshome".
 *
 * @property int $id
 * @property string $imagen
 * @property string $texto
 */
class Cardshome extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'cardshome';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['imagen', 'texto'], 'required'],
            [['imagen', 'texto'], 'string', 'max' => 50],
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
            'texto' => 'Texto',
        ];
    }
}
