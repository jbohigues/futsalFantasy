<?php

namespace app\models;

use Yii;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "ligas".
 *
 * @property int $id
 * @property string $nombre
 * @property string $foto
 * @property string $codigoLiga Código para que el resto de usuarios puedan acceder a esta liga
 * @property int $abono Reglas que puede modificar el líder de cada liga: cantidad de dinero que se gana por punto conseguido en cada jornada
 * @property int $numMaxPlantilla Reglas que puede modificar el líder de cada liga: núm. máx. de jugadores en cada plantilla
 * @property int $numJugMercado Reglas que puede modificar el líder de cada liga: núm. máx. de jugadores libres en el mercado de fichajes
 * @property int $diasJugEnMercado Reglas que puede modificar el líder de cada liga: cuántos días estarán los jugadores en el mercado de fichajes
 * @property int $diasGestionPujas Reglas que puede modificar el líder de cada liga: cuántos días tendrán los usuarios para aceptar o rechazar las pujas, después de este tiempo caducarán y se cancelarán
 * @property int $idUsuarioLider
 *
 * @property Equiposusuarios[] $equiposusuarios
 * @property Jugadoresreales[] $idJugadorReals
 * @property Usuarios $idUsuarioLider0
 * @property Jugadoresrealesencadaliga[] $jugadoresrealesencadaligas
 * @property Noticias[] $noticias
 * @property Puntosliga $puntosliga
 */
class Ligas extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'ligas';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nombre', 'codigoLiga', 'idUsuarioLider'], 'required'],
            [['abono', 'numMaxPlantilla', 'numJugMercado', 'diasJugEnMercado', 'diasGestionPujas', 'idUsuarioLider'], 'integer'],
            [['nombre', 'foto', 'codigoLiga'], 'string', 'max' => 50],
            [['idUsuarioLider'], 'exist', 'skipOnError' => true, 'targetClass' => Usuarios::className(), 'targetAttribute' => ['idUsuarioLider' => 'id']],
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
            'foto' => 'Foto',
            'codigoLiga' => 'Código de Liga',
            'abono' => 'Abono',
            'numMaxPlantilla' => 'Máx. Plantilla',
            'numJugMercado' => 'Máx. Jugadores libres Mercado',
            'diasJugEnMercado' => 'Días jug. libres Mercado',
            'diasGestionPujas' => 'Días gestión pujas',
            'idUsuarioLider' => 'Id Usuario Lider',
        ];
    }

    /**
     * Gets query for [[Equiposusuarios]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getEquiposusuarios()
    {
        return $this->hasMany(Equiposusuarios::className(), ['idLiga' => 'id']);
    }

    /**
     * Gets query for [[IdJugadorReals]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdJugadorReals()
    {
        return $this->hasMany(Jugadoresreales::className(), ['id' => 'idJugadorReal'])->viaTable('jugadoresrealesencadaliga', ['idLiga' => 'id']);
    }

    /**
     * Gets query for [[IdUsuarioLider0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdUsuarioLider0()
    {
        return $this->hasOne(Usuarios::className(), ['id' => 'idUsuarioLider']);
    }

    /**
     * Gets query for [[Jugadoresrealesencadaligas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getJugadoresrealesencadaligas()
    {
        return $this->hasMany(Jugadoresrealesencadaliga::className(), ['idLiga' => 'id']);
    }

    /**
     * Gets query for [[Noticias]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getNoticias()
    {
        return $this->hasMany(Noticias::className(), ['idLiga' => 'id']);
    }

    /**
     * Gets query for [[Puntosliga]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getPuntosliga()
    {
        return $this->hasOne(Puntosliga::className(), ['idLiga' => 'id']);
    }

    public static function lookup(){
        return ArrayHelper::map(self::find()->asArray()->all(),'id','nombre');
    }
}
