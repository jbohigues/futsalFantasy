<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\JugadoresReales;

/**
 * JugadoresRealesSearch represents the model behind the search form of `app\models\JugadoresReales`.
 */
class JugadoresRealesSearch extends JugadoresReales
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'puntos', 'valorMercado', 'idEquipoReal'], 'integer'],
            [['nombre', 'apellidos', 'alias', 'posicion', 'estado', 'foto'], 'safe'],
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
        $query = JugadoresReales::find();

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
            'puntos' => $this->puntos,
            'valorMercado' => $this->valorMercado,
            'idEquipoReal' => $this->idEquipoReal,
        ]);

        $query->andFilterWhere(['like', 'nombre', $this->nombre])
            ->andFilterWhere(['like', 'apellidos', $this->apellidos])
            ->andFilterWhere(['like', 'alias', $this->alias])
            ->andFilterWhere(['like', 'posicion', $this->posicion])
            ->andFilterWhere(['like', 'estado', $this->estado])
            ->andFilterWhere(['like', 'foto', $this->foto]);

        return $dataProvider;
    }
}
