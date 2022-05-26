<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "logosequiposreales".
 *
 * @property int $id
 * @property int $idEquipoReal
 * @property string $nombre
 *
 * @property Equiposreales $idEquipoReal0
 */
class Logosequiposreales extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'logosequiposreales';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['idEquipoReal', 'nombre'], 'required'],
            [['idEquipoReal'], 'integer'],
            [['nombre'], 'string', 'max' => 20],
            [['idEquipoReal'], 'exist', 'skipOnError' => true, 'targetClass' => Equiposreales::className(), 'targetAttribute' => ['idEquipoReal' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'idEquipoReal' => 'Id Equipo Real',
            'nombre' => 'Nombre',
        ];
    }

    /**
     * Gets query for [[IdEquipoReal0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdEquipoReal()
    {
        return $this->hasOne(Equiposreales::className(), ['id' => 'idEquipoReal']);
    }
}
