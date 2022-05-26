<?php

namespace app\models;

use Yii;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "jugadoresreales".
 *
 * @property int $id
 * @property string $nombre
 * @property string $apellidos
 * @property string $alias Apodo que tienen en la camiseta: es por el nombre que se les conoce
 * @property int $puntos
 * @property string $posicion Puede ser: 'Portero', 'Cierre', 'Ala', 'Pivot'
 * @property int $valorMercado
 * @property string $estado Estado del jugador: 'OK', 'Lesionado', 'Expulsado', 'Pendiente'
 * @property string|null $foto
 * @property int $idEquipoReal
 *
 * @property Fotosjugadoresreales[] $fotosjugadoresreales
 * @property Equiposreales $idEquipoReal0
 * @property Ligas[] $idLigas
 * @property Calendario[] $idPartidos
 * @property Infojugadoresenpartido[] $infojugadoresenpartidos
 * @property Jugadoresrealesencadaliga[] $jugadoresrealesencadaligas
 * @property Traspasos[] $traspasos
 */
class Jugadoresreales extends \yii\db\ActiveRecord
{
    public static $estadoOptions = ['P' => 'Pendiente', 'OK' => 'Buena forma', 'L' => 'Lesionado', 'EX' => 'Expulsado'];
    public static $posicionOptions = ['PT' => 'Portero', 'CI' => 'Cierre', 'AL' => 'Ala', 'PV' => 'Pivot'];

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'jugadoresreales';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nombre', 'apellidos', 'alias', 'idEquipoReal'], 'required'],
            [['puntos', 'valorMercado', 'idEquipoReal'], 'integer'],
            [['posicion', 'estado'], 'string'],
            [['nombre', 'apellidos', 'alias', 'foto'], 'string', 'max' => 50],
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
            'nombre' => 'Nombre',
            'apellidos' => 'Apellidos',
            'alias' => 'Alias',
            'puntos' => 'Puntos',
            'posicion' => 'Posición',
            'valorMercado' => 'Valor Mercado',
            'estado' => 'Estado',
            'foto' => 'Foto',
            'idEquipoReal' => 'Id Equipo Real',
        ];
    }

    /**
     * Gets query for [[Fotosjugadoresreales]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getFotosjugadoresreales()
    {
        return $this->hasMany(Fotosjugadoresreales::className(), ['idJugadorReal' => 'id']);
    }

    /**
     * Gets query for [[IdEquipoReal0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdEquipoReal0()
    {
        return $this->hasOne(Equiposreales::className(), ['id' => 'idEquipoReal']);
    }

    /**
     * Gets query for [[IdLigas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdLigas()
    {
        return $this->hasMany(Ligas::className(), ['id' => 'idLiga'])->viaTable('jugadoresrealesencadaliga', ['idJugadorReal' => 'id']);
    }

    /**
     * Gets query for [[IdPartidos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdPartidos()
    {
        return $this->hasMany(Calendario::className(), ['id' => 'idPartido'])->viaTable('infojugadoresenpartido', ['idJugador' => 'id']);
    }

    /**
     * Gets query for [[Infojugadoresenpartidos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getInfojugadoresenpartidos()
    {
        return $this->hasMany(Infojugadoresenpartido::className(), ['idJugador' => 'id']);
    }

    /**
     * Gets query for [[Jugadoresrealesencadaligas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getJugadoresrealesencadaligas()
    {
        return $this->hasMany(Jugadoresrealesencadaliga::className(), ['idJugadorReal' => 'id']);
    }

    /**
     * Gets query for [[Traspasos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTraspasos()
    {
        return $this->hasMany(Traspasos::className(), ['idJugador' => 'id']);
    }

    //Obtiene el texto del campo Estado
    public function getEstadoText(){
        return self::$estadoOptions[$this->estado] ?? '';
    }

    //Obtiene el texto del campo Posicion
    public function getPosicionText(){
        return self::$posicionOptions[$this->posicion] ?? '';
    }

    public static function lookup(){
        return ArrayHelper::map(self::find()->asArray()->all(),'id','alias');
    }
}
