<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Traspasos;

/**
 * TraspasosSearch represents the model behind the search form of `app\models\Traspasos`.
 */
class TraspasosSearch extends Traspasos
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'idJugador', 'idEquipoUserEmisor', 'idEquipoUserReceptor', 'precio'], 'integer'],
            [['estado'], 'safe'],
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
        $query = Traspasos::find();

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
            'idJugador' => $this->idJugador,
            'idEquipoUserEmisor' => $this->idEquipoUserEmisor,
            'idEquipoUserReceptor' => $this->idEquipoUserReceptor,
            'precio' => $this->precio,
        ]);

        $query->andFilterWhere(['like', 'estado', $this->estado]);

        return $dataProvider;
    }
}
