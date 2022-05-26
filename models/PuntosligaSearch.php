<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Puntosliga;

/**
 * PuntosligaSearch represents the model behind the search form of `app\models\Puntosliga`.
 */
class PuntosligaSearch extends Puntosliga
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'idLiga', 'titular', 'golDL', 'golMC', 'golDF', 'golPT', 'primeraAmarilla', 'segundaAmarilla', 'rojaDirecta', 'malPartido', 'noJuegaPartido', 'buenPartido', 'excelentePartido', 'perfectoPartido'], 'integer'],
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
        $query = Puntosliga::find();

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
            'idLiga' => $this->idLiga,
            'titular' => $this->titular,
            'golDL' => $this->golDL,
            'golMC' => $this->golMC,
            'golDF' => $this->golDF,
            'golPT' => $this->golPT,
            'primeraAmarilla' => $this->primeraAmarilla,
            'segundaAmarilla' => $this->segundaAmarilla,
            'rojaDirecta' => $this->rojaDirecta,
            'malPartido' => $this->malPartido,
            'noJuegaPartido' => $this->noJuegaPartido,
            'buenPartido' => $this->buenPartido,
            'excelentePartido' => $this->excelentePartido,
            'perfectoPartido' => $this->perfectoPartido,
        ]);

        return $dataProvider;
    }
}
