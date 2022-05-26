<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Ligas;

/**
 * LigasSearch represents the model behind the search form of `app\models\Ligas`.
 */
class LigasSearch extends Ligas
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'abono', 'numMaxPlantilla', 'numJugMercado', 'diasJugEnMercado', 'diasGestionPujas', 'idUsuarioLider'], 'integer'],
            [['nombre', 'foto', 'codigoLiga'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Ligas::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'abono' => $this->abono,
            'numMaxPlantilla' => $this->numMaxPlantilla,
            'numJugMercado' => $this->numJugMercado,
            'diasJugEnMercado' => $this->diasJugEnMercado,
            'diasGestionPujas' => $this->diasGestionPujas,
            'idUsuarioLider' => $this->idUsuarioLider,
        ]);

        $query->andFilterWhere(['like', 'nombre', $this->nombre])
            ->andFilterWhere(['like', 'foto', $this->foto])
            ->andFilterWhere(['like', 'codigoLiga', $this->codigoLiga]);

        return $dataProvider;
    }
}
